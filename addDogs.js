// const db = require('./firebase.js'); // Importa o Firestore

// const dogsCollection = db.collection('dogs');

// // Adicionar informações dos cachorros
// const cachorroData = {
//     nome: 'Galgo',
//     tamanho: 'Grande',
//     peso: '25-40',
//     corPelagem: 'Varia',
//     tipoPelagem: 'Curta',
//     expectativaVida: '10-14',
//     nivelEnergia: 'Médio',
//     temperamento: 'Gentil, Afetuoso, Inteligente',
//     necessidadesExercicio: 'Altas',
//     facilidadeTreinamento: 'Média',
//     nivelSocializacao: 'Alto',
//     nivelLatido: 'Baixo',
//     propensaoDoencasGeneticas: 'Nenhuma informação disponível',
//     necessidadesCuidadosPelagem: 'Baixas',
//     requisitosEspaco: 'Adequado para Apartamentos',
//     nivelProtecao: 'Baixo',
//     precoMedioCompra: '500 - 2.000',
//     custosVeterinariosMensais: '50 - 100',
//     custosAlimentacaoMensais: '50 - 100',
//     descricao: 'O Galgo é uma raça de cachorro elegante e atlética, conhecida por sua velocidade e agilidade. Eles têm uma pelagem curta que requer cuidados mínimos. Galgos são cães gentis e afetuosos, geralmente bons com crianças e outros animais de estimação.'
//   };



// // Adicionar os dados do Chihuahua à coleção "dogs"
// dogsCollection.doc('Galgo').set(cachorroData)
//   .then(() => {
//     console.log('Informações adicionadas ao banco de dados com sucesso!');
//   })
//   .catch(error => {
//     console.error('Erro ao adicionar informações ao banco de dados:', error);
//   });


// Dados a serem inseridos na coleção "dogs"
// const data = [
//   {
//     nome: 'Galgo',
//     tamanho: 'Grande',
//     peso: '25-40',
//     corPelagem: 'Varia',
//     tipoPelagem: 'Curta',
//     expectativaVida: '10-14',
//     nivelEnergia: 'Médio',
//     temperamento: 'Gentil, Afetuoso, Inteligente',
//     necessidadesExercicio: 'Altas',
//     facilidadeTreinamento: 'Média',
//     nivelSocializacao: 'Alto',
//     nivelLatido: 'Baixo',
//     propensaoDoencasGeneticas: 'Nenhuma informação disponível',
//     necessidadesCuidadosPelagem: 'Baixas',
//     requisitosEspaco: 'Adequado para Apartamentos',
//     nivelProtecao: 'Baixo',
//     precoMedioCompra: '500 - 2.000',
//     custosVeterinariosMensais: '50 - 100',
//     custosAlimentacaoMensais: '50 - 100',
//     descricao: 'O Galgo é uma raça de cachorro elegante e atlética, conhecida por sua velocidade e agilidade. Eles têm uma pelagem curta que requer cuidados mínimos. Galgos são cães gentis e afetuosos, geralmente bons com crianças e outros animais de estimação.'
//   }
// ];

// // Função para conectar e inserir os dados
// async function inserirDados() {
//   const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
//   await client.connect();

//   const db = client.db('Guia-Canino');
//   const collection = db.collection('dogs');

//   const result = await collection.insertMany(data);
//   console.log(`${result.insertedCount} documentos inseridos`);

//   await client.close();
// }

// // Chama a função para inserir os dados
// inserirDados().catch(console.error);

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://darftsoftware:11101110@cluster0.8en20si.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

//código para tranferir os dados

const { MongoClient } = require('mongodb');


// Configuração do MongoDB
const uri = "mongodb+srv://darftsoftware:11101110@cluster0.8en20si.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function listDocument() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("Guia-Canino");
    const collection = database.collection("dogs");

   // Encontre um documento específico (substitua o filtro conforme necessário)
   const query = { nome: "Pug" };
   const document = await collection.findOne(query);

   if (document) {
     console.log("Dados do documento:");
     console.log(document);
   } else {
     console.log("Documento não encontrado");
   }
 } catch (error) {
   console.error("Erro ao listar documento:", error);
 } finally {
   await client.close();
 }

}

listDocument();

