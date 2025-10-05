import { Feather } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

type CameraModalProps = {
  visible: boolean;
  onClose: () => void;
  onImagePicked?: (uri: string) => void;
  userId?: string;
};

export default function CameraModal({
  visible,
  onClose,
  onImagePicked,
  userId,
}: CameraModalProps) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Necesitamos permiso para usar la cámara</Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={styles.permissionButton}
        >
          <Text style={styles.permissionText}>Dar permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const uploadImageToSupabase = async (uri: string) => {
    try {
      setUploading(true);

      const response = await fetch(uri);
      const blob = await response.blob();

      const arrayBuffer: ArrayBuffer = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = reject;
        reader.readAsArrayBuffer(blob);
      });

      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2, 15);
      const fileName = `${userId || "user"}_${timestamp}_${randomId}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, arrayBuffer, {
          cacheControl: "3600",
          upsert: false,
          contentType: "image/jpeg",
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);

      if (!data || !data.publicUrl) {
        throw new Error("No se pudo obtener la URL pública del archivo.");
      }

      return data.publicUrl;
    } catch (err) {
      console.error("Error subiendo imagen:", err);
      Alert.alert("Error", "No se pudo subir la imagen. Intenta de nuevo.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current && !uploading) {
      try {
        const photoData = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
          exif: false,
        });

        setPhoto(photoData.uri);

        const publicUrl = await uploadImageToSupabase(photoData.uri);
        if (publicUrl && onImagePicked) {
          onImagePicked(publicUrl);
          onClose();
        }
      } catch (error) {
        console.error("Error tomando foto:", error);
        Alert.alert("Error", "No se pudo tomar la foto. Intenta de nuevo.");
      }
    }
  };

  const pickFromGallery = async () => {
    if (uploading) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: false,
        exif: false,
      });

      if (!result.canceled && result.assets[0]) {
        const uri = result.assets[0].uri;
        setPhoto(uri);

        const publicUrl = await uploadImageToSupabase(uri);
        if (publicUrl && onImagePicked) {
          onImagePicked(publicUrl);
          onClose();
        }
      }
    } catch (error) {
      console.error("Error seleccionando imagen:", error);
      Alert.alert("Error", "No se pudo seleccionar la imagen.");
    }
  };

  const handleClose = () => {
    if (!uploading) {
      setPhoto(null);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        {uploading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#e7c022" />
            <Text style={styles.loadingText}>Subiendo imagen...</Text>
          </View>
        )}

        {!photo ? (
          <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
            <View style={styles.controls}>
              <TouchableOpacity
                style={styles.flipButton}
                onPress={toggleCameraFacing}
                disabled={uploading}
              >
                <Feather name="refresh-ccw" size={28} color="white" />
              </TouchableOpacity>
            </View>
          </CameraView>
        ) : (
          <Image source={{ uri: photo }} style={styles.preview} />
        )}

        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={[styles.captureButton, uploading && styles.disabledButton]}
            onPress={takePicture}
            disabled={uploading}
          >
            <Feather name="camera" size={28} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.galleryButton, uploading && styles.disabledButton]}
            onPress={pickFromGallery}
            disabled={uploading}
          >
            <Feather name="image" size={28} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.closeButton, uploading && styles.disabledButton]}
            onPress={handleClose}
            disabled={uploading}
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black", position: "relative" },
  message: { textAlign: "center", paddingBottom: 10, color: "white", fontSize: 16 },
  permissionButton: {
    backgroundColor: "#e7c022",
    padding: 15,
    borderRadius: 10,
    alignSelf: "center",
    marginHorizontal: 20,
  },
  permissionText: { color: "black", fontWeight: "600", fontSize: 16 },
  camera: { flex: 1 },
  controls: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
  },
  flipButton: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 50,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#111",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#e7c022",
    justifyContent: "center",
    alignItems: "center",
  },
  galleryButton: {
    padding: 15,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 50,
  },
  closeButton: {
    padding: 15,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
  },
  closeButtonText: { color: "white", fontWeight: "600" },
  preview: { flex: 1, resizeMode: "contain" },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  loadingText: { color: "white", marginTop: 15, fontSize: 16 },
  disabledButton: { opacity: 0.5 },
});
