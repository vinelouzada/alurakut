import styled from 'styled-components';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AluraKutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import React from 'react';

const githubUser = 'vinelouzada';

function ProfileSidebar(){
  return (
    <Box as="aside"> 
      <img src = {`https://github.com/${githubUser}.png`} style={{borderRadius: '8px'}}></img>
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          @{githubUser}
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
                    <a href = {`/user/${githubUser.login}`}>
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
export default function Home() {
  const [comunidades, setComunidades] = React.useState([/*{
       id: new Date().toISOString(),
       title:"Eu odeio acordar cedo",
       image: "https://alurakut.vercel.app/capa-comunidade-01.jpg"
  }*/]);

  const pessoasFavoritas = [
    'juunegreiros',
    'marcobrunodev',
    'douglasquintanilha',
    'JulianaAmoasei',
    'omariosouto',
    'peas'
  ]

const [seguindo, setSeguindo] = React.useState([]);

React.useEffect(function(){
  ///GET
  fetch("https://api.github.com/users/vinelouzada/following")
  .then(function (respostaDoServidor){
      return respostaDoServidor.json()
  })
  .then(function (respostaConvertida){
      setSeguindo(respostaConvertida);
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
      console.log(comunidades);
    })
  
},[]);

  return (
    <>
    <AlurakutMenu githubUser={githubUser}/>
    <MainGrid>
      <div className = "profile-area" style = {{ gridArea: 'profile-area'}}>
        <ProfileSidebar/>
      </div>
      
      <div className = "welcomeArea" style = {{gridArea: 'welcomeArea'}}>
        <Box>
          <h1 className = "title">
            Bem Vindo(a)
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
      </div>

      <div className = "profileRelationsArea" style = {{gridArea: 'profileRelationsArea'}}>
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

        
        
        <ProfileRelationsBoxWrapper>
              <h2 className = "smallTitle">Pessoas da Comunidade ({pessoasFavoritas.length})</h2>
              <ul>     
                {pessoasFavoritas.map((githubUser) =>{
                  return (
                    <li key={githubUser}>
                      <a href = {`/user/${githubUser}`}>
                        <img src={`https://github.com/${githubUser}.png`}></img>
                        <span>{githubUser}</span>
                      </a>
                    </li> 
                  )
                })}      
              </ul>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBox title = "Seguindo" items = {seguindo}/>

      </div>
      
    </MainGrid>
    </>
  )
}
