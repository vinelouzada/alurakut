import styled from 'styled-components';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import Depoimento from '../src/components/Depoimento';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AluraKutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import {Helmet} from 'react-helmet'
const githubUser = 'vinelouzada';

function ProfileSidebar(propriedades){
  return (
    <Box as="aside"> 
      <img src = {`https://github.com/${propriedades.githubUser}.png`} style={{borderRadius: '8px'}}></img>
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades){
    return (
      <ProfileRelationsBoxWrapper>
            <h2 className = "smallTitle">{propriedades.title} ({propriedades.items.length})</h2>
            {
            <ul>     
              {propriedades.items.map((githubUser) =>{
                return (
                  <li key={githubUser.login}>
                    <a href = {`https://github.com/${githubUser.login}`} target="_blank" >
                      <img src={`https://github.com/${githubUser.login}.png`}></img>
                      <span>{githubUser.login}</span>
                    </a>
                  </li> 
                )
              })}      
            </ul>
            }
        </ProfileRelationsBoxWrapper>
    )
}

export default function Home(props) {

  //console.log(props.githubUser);
  const [comunidades, setComunidades] = React.useState([/*{
       id: new Date().toISOString(),
       title:"Eu odeio acordar cedo",
       image: "https://alurakut.vercel.app/capa-comunidade-01.jpg"
  }*/]);
  //console.log(comunidades);

  const pessoasFavoritas = [
    'juunegreiros',
    'marcobrunodev',
    'douglasquintanilha',
    'JulianaAmoasei',
    'omariosouto',
    'peas'
  ]

const [seguindo, setSeguindo] = React.useState([]);

const [depoimentos, setDepoimentos] = React.useState([]);

const [seguidores, setSeguidores] = React.useState([]);


React.useEffect(function(){
  ///GET
  fetch(`https://api.github.com/users/${props.githubUser}/following`)
  .then(function (respostaDoServidor){
      return respostaDoServidor.json()
  })
  .then(function (respostaConvertida){
      setSeguindo(respostaConvertida);
  })

  fetch(`https://api.github.com/users/${props.githubUser}/followers`)
  .then((response) => {
    return response.json()
  })
  .then((response2)=>{
      setSeguidores(response2)
  })



  ///API GraphQL //POST
  fetch('https://graphql.datocms.com/',{
    method: 'POST',
    headers: {
      'Authorization': 'b432331af95fa331a69ece7f03913b',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({"query": `{
      allCommunities {
        id
        title
        imageUrl
        creatorSlug
      }
    }`})
    })
    .then((response) => response.json())
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      setComunidades(comunidadesVindasDoDato);
      //console.log(comunidades);
    })



    ///buscar depoimentos
    fetch('https://graphql.datocms.com/',{
      method: 'POST',
      headers: {
        'Authorization': 'b432331af95fa331a69ece7f03913b',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({"query": `{
        allDepoimentos {
          id
          usuario
          depoimento
          imagem
        }
      }`})
      })
      .then((response) => response.json())
      .then((respostaCompleta) =>{
        const depoimentoss = respostaCompleta.data.allDepoimentos;
        setDepoimentos(depoimentoss);
        //console.log(depoimentoss)
      })
  
},[]);
  return (
    <>
    <AlurakutMenu />
    <MainGrid>
      
      <div className = "profile-area" style = {{ gridArea: 'profile-area'}}>
        <ProfileSidebar githubUser={props.githubUser}/>
      </div>
      
      <div className = "welcomeArea" style = {{gridArea: 'welcomeArea'}}>
        <Box>
          <h1 className = "title">
            Bem Vindo(a), {props.githubUser}
          </h1>

          <OrkutNostalgicIconSet confiavel={3} legal={3} sexy={1}/>
        </Box>
        <Box>
          <h2> O que você deseja fazer? </h2>
          <form onSubmit={function handleCriaComunidade(e){
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);
              

              const comunidade ={
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: githubUser,
              }

              fetch('/api/comunidades',{
                method: "POST",
                headers:{
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response)=>{
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);
              })

              
             
          }}>
            <div>
              <input placeholder="Qual vai ser o nome da sua comunidade?" name="title" aria-label="Qual vai ser o nome da sua comunidade?" type = "text"/>
            </div>
            <div>
              <input placeholder="Coloque uma URL para usarmos de capa" name="image" aria-label="Coloque uma URL para usarmos de capa" type = "text"/>
            </div>

            <button>
              Criar comunidade
            </button>
          </form>
        </Box>

        <Box>
          <h2> Scraps </h2>
          <form onSubmit = {(e)=>{
            e.preventDefault();
            const dadosDepoimento = new FormData(e.target);
            const depoimento = {
              usuario: dadosDepoimento.get('usuario'),
              depoimento: dadosDepoimento.get('depoimento'),
              imagem: `https://github.com/${dadosDepoimento.get('usuario')}.png`
            }

            fetch('/api/depoimentos',{
              method: "POST",
              headers:{
                "Content-Type": "application/json",
              },
              body: JSON.stringify(depoimento)
            })
            .then(async (response)=>{
              const dados2 = await response.json();
              //console.log(dados2.criarDepoimento);
              const depoimentox  = dados2.criarDepoimento;
              const depoimentosAtualizados = [...depoimentos, depoimentox];
              setDepoimentos(depoimentosAtualizados);
              console.log(depoimentosAtualizados);
            })
            
            
          }}>
            <input placeholder = "Usuário do Github" name = "usuario" aria-label="Usuário do Github" type="text" maxLength="20"></input>
            <input placeholder = "Depoimento" name = "depoimento" aria-label="Depoimento" type="text" maxLength="80"></input>
            <button>
              Publicar depoimento
            </button>
          </form>
        </Box>
        <Box>
          <>
          <Depoimento>
            <h2>Depoimentos</h2>
            <table>
              {depoimentos.map((itemAtual) =>{
                return(
                <tbody>
                  <tr key={itemAtual.usuario}>
                    <td>
                    <div>
                      <img src = {itemAtual.imagem}></img>
                    </div>
                    <div>
                      <a href={`https://github.com/${itemAtual.usuario}`}>
                        <h5>@{itemAtual.usuario}</h5>
                      </a>
                      <span>{itemAtual.depoimento}</span>
                    </div>
                    
                    </td>
                  </tr> 
                </tbody> 
                )
              })}
            </table>
          </Depoimento>
          </>
        </Box>


      </div>

      <div className = "profileRelationsArea" style = {{gridArea: 'profileRelationsArea'}}>
          
        <ProfileRelationsBox title = "Seguindo" items = {seguindo}/>
        
        
        <ProfileRelationsBoxWrapper>
              <h2 className = "smallTitle">Seguindo({seguidores.length})</h2>
              <ul>     
                {seguidores.map((githubUser) =>{
                  return (
                    <li key={githubUser.login}>
                      <a href = {`https://github.com/${githubUser.login}`} target="_blank">
                        <img src={`https://github.com/${githubUser.login}.png`}></img>
                        <span>{githubUser.login}</span>
                      </a>
                    </li> 
                  )
                })}      
              </ul>
        </ProfileRelationsBoxWrapper>

        
        
        <ProfileRelationsBoxWrapper>
          <h2 className = "smallTitle">Comunidades ({comunidades.length})</h2>
          <ul>
          {comunidades.map((itemAtual) =>{
                  return (
                    <li key={itemAtual.id}>
                      <a href = {`/community/${itemAtual.title}`}>
                        <img src={itemAtual.imageUrl}></img>
                        <span>{itemAtual.title}</span>
                      </a>
                    </li> 
                  )
                })}      
          </ul>
        </ProfileRelationsBoxWrapper>
      </div>
      
      
    </MainGrid>
    
      <Helmet>
        <link rel="short icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Orkut_Logo_2.png/480px-Orkut_Logo_2.png" type="image/x-icon"/>
      </Helmet>  
    





    </>
  )
}

export async function getServerSideProps(context){
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN
  
  

  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
        Authorization: token
      }
  })
  .then((resposta) => resposta.json())
  console.log('isAuthenticated', isAuthenticated)
  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  const {githubUser} = jwt.decode(token);
  console.log('Token decodificado', jwt.decode(token));
  
  return{
    props: {
      githubUser//: 'vinelouzada'
    }
  }
}
