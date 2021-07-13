import styled from 'styled-components';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet} from '../src/lib/AluraKutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

const githubUser = 'vinelouzada';
function ProfileSidebar(){
  return (
    <Box> 
      <img src = {`https://github.com/${githubUser}.png`} style={{borderRadius: '8px'}}></img>
    </Box>
  )
}


export default function Home() {
  const pessoasFavoritas = [
    'vanessametonini',
    'rafaballerini',
    'giovannamoeller',
    'cviniciussdias',
    'omariosouto',
    'peas'
  ]

  return (
    <>
    <AlurakutMenu/>
    <MainGrid>
      <div className = "profile-area" style = {{ gridArea: 'profile-area'}}>
        <ProfileSidebar/>
      </div>
      
      <div className = "welcomeArea" style = {{gridArea: 'welcomeArea'}}>
        <Box>
          <h1 className = "title">
            Bem Vindo(a)
          </h1>

          <OrkutNostalgicIconSet />
        </Box>
      </div>

      <div className = "profileRelationsArea" style = {{gridArea: 'profileRelationsArea'}}>
        <ProfileRelationsBoxWrapper>
            <h2 className = "smallTitle">Amigos ({pessoasFavoritas.length})</h2>
            <ul>     
              {pessoasFavoritas.map((githubUser) =>{
                return (
                  <li>
                    <a href = {`/user/${githubUser}`} key={githubUser}>
                      <img src={`https://github.com/${githubUser}.png`}></img>
                      <span>{githubUser}</span>
                    </a>
                  </li> 
                )
              })}      
            </ul>

        </ProfileRelationsBoxWrapper>
        <Box>
          Comunidades
        </Box>
      </div>
      
    </MainGrid>
    </>
  )
}
