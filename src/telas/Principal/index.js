import { ScrollView, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { Cabecalho } from "../../componentes/Cabecalho";
import { CartaoInfo } from "../../componentes/CartaoInfo";
import { NovoPostBotao } from "../../componentes/NovoPostBotao";
import { pegarPostsTempoReal } from "../../servicos/firestore";
import estilos from "./estilos";

import { storage } from "../../config/firebase";
import { ref, getDownloadURL } from "firebase/storage";

export default function Principal({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const imagmRef = ref(storage, "moon.jpeg");
    getDownloadURL(imagmRef).then((url) => {
      console.log(url);
    });

    pegarPostsTempoReal(setPosts);
  }, []);

  return (
    <SafeAreaView style={estilos.container}>
      <Cabecalho />
      <ScrollView style={estilos.scroll} showsVerticalScrollIndicator={false}>
        {posts?.map((item) => (
          <CartaoInfo
            key={item.id}
            imagem={item.imagem}
            titulo={item.titulo}
            fonte={item.fonte}
            descricao={item.descricao}
            acao={() => navigation.navigate("Post", { item })}
          />
        ))}
      </ScrollView>

      <NovoPostBotao acao={() => navigation.navigate("Post")} />
    </SafeAreaView>
  );
}
