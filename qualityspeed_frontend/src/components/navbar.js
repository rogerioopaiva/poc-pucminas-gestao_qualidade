import React from 'react'

import NavbarItem from './navbarItem'
import { AuthConsumer } from '../main/provedorAutenticacao'


function Navbar(props){
    return (
      <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
        <div className="container">
          <a href="#/home" className="navbar-brand">QualitySpeed</a>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
                <NavbarItem render={props.isUsuarioAutenticado} href="#/home" label="Home" />
                <NavbarItem render={props.isUsuarioAutenticado} href="#/cadastro-usuarios" label="Usuários" />
                <NavbarItem render={props.isUsuarioAutenticado} href="#/consulta-colaboradores" label="Colaboradores" />
                <NavbarItem render={props.isUsuarioAutenticado} href="#/consulta-documentos" label="Documentos" />
                <NavbarItem render={props.isUsuarioAutenticado} href="#/consulta-naoconformidades" label="Não Conformidades" />
                <NavbarItem render={props.isUsuarioAutenticado} href="#/consulta-planosacao" label="Planos de Ação" />
                <NavbarItem render={props.isUsuarioAutenticado} onClick={props.deslogar} href="#/login" label="Sair" />

            </ul>
          </div>
        </div>
      </div>
    )   
}

export default () => (
    <AuthConsumer>
        {(context) => (
            <Navbar isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao} />
        )}
    </AuthConsumer>
)