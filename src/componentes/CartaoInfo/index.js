import { useState } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import estilos from "./estilos";
import placeholder from "../../assets/upload.jpeg";

export function CartaoInfo({ imagem, titulo, fonte, descricao, acao }) {
  const [mostrarDescricao, setMostrarDescricao] = useState(false);

  return (
    <TouchableOpacity
      style={estilos.container}
      onPress={() => setMostrarDescricao(!mostrarDescricao)}
      onLongPress={acao}
    >
      {imagem != null && imagem != "" && (
        <Image source={{ uri: imagem }} style={estilos.imagem} />
      )}
      {imagem == "" && <Image source={placeholder} style={estilos.imagem} />}

      <View style={estilos.containerTexto}>
        <Text style={estilos.textoNome}>{titulo}</Text>
        <Text style={estilos.textoFonte}>{fonte}</Text>
        <Text
          style={[
            estilos.textoDescricao,
            mostrarDescricao && { display: "flex" },
          ]}
        >
          {descricao}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
