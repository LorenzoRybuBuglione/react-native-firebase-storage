import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import {
  salvarPost,
  atualizarPost,
  deletarPost,
} from "../../servicos/firestore";
import estilos from "./estilos";
import { entradas } from "./entradas";
import { alteraDados } from "../../utils/comum";
import { IconeClicavel } from "../../componentes/IconeClicavel";
import { storage } from "../../config/firebase";
import { ref, uploadBytes } from "firebase/storage";

const imagemGalaxia =
  "https://img.olhardigital.com.br/wp-content/uploads/2022/01/via-lactea-filamento-hidrogenio-capa.jpg";

export default function Post({ navigation, route }) {
  const [desabilitarEnvio, setDesabilitarEnvio] = useState(false);
  const { item } = route?.params || {};

  const [post, setPost] = useState({
    titulo: item?.titulo || "",
    fonte: item?.fonte || "",
    descricao: item?.descricao || "",
  });

  async function salvar() {
    setDesabilitarEnvio(true);
    if (item) {
      await atualizarPost(item.id, post);
    } else {
      await salvarPost(post);
    }

    navigation.goBack();
  }

  async function salvarImagem() {
    const downloadImagem = await fetch(imagemGalaxia);
    const blobImagem = await downloadImagem.blob();
    const imagemRef = ref(storage, "posts/imagem.png");

    uploadBytes(imagemRef, blobImagem)
      .then(() => {
        console.log("Upload feito");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.containerTitulo}>
        <Text style={estilos.titulo}>{item ? "Editar post" : "Novo Post"}</Text>
        <IconeClicavel
          exibir={!!item}
          onPress={() => {
            deletarPost(item.id);
            navigation.goBack();
          }}
          iconeNome="trash-2"
        />
      </View>
      <ScrollView style={{ width: "100%" }}>
        {entradas?.map((entrada) => (
          <View key={entrada.id}>
            <Text style={estilos.texto}>{entrada.label}</Text>
            <TextInput
              value={post[entrada.name]}
              placeholder={entrada.label}
              multiline={entrada.multiline}
              onChangeText={(valor) =>
                alteraDados(entrada.name, valor, post, setPost)
              }
              style={[
                estilos.entrada,
                entrada.multiline && estilos.entradaDescricao,
              ]}
            />
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={estilos.botao}
        onPress={salvar}
        disabled={desabilitarEnvio}
      >
        <Text style={estilos.textoBotao}>Salvar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
