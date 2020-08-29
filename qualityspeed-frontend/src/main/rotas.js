import React from 'react'

import Login from '../views/login'
import Home from '../views/home'
import CadastroUsuario from '../views/cadastroUsuario'
import ConsultaDocumentos from '../views/documentos/consulta-documentos'
import CadastroDocumentos from '../views/documentos/cadastro-documentos'
import CadastroColaboradores from '../views/colaboradores/cadastro-colaboradores'
import ConsultaColaboradores from '../views/colaboradores/consulta-colaboradores'
import CadastroNaoConformidades from '../views/naoconformidades/cadastro-naoconformidades'
import ConsultaNaoConformidades from '../views/naoconformidades/consulta-naoconformidades'
import CadastroPlanosAcao from '../views/planosacao/cadastro-planosacao'
import ConsultaPlanosAcao from '../views/planosacao/consulta-planosacao'

import { AuthConsumer } from '../main/provedorAutenticacao'

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'

function RotaAutenticada( { component: Component, isUsuarioAutenticado, ...props } ) {
    return (
        <Route {...props} render={ (componentProps) => {
            if(isUsuarioAutenticado) {
                return (
                    <Component {...componentProps} />
                )
            }else{
                return (
                    <Redirect to={ {pathname : '/login', state : { from: componentProps.location } } }/>
                )
            }
        } } />
    )
}


function Rotas(props){
    console.log(props)
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-documentos" component={ConsultaDocumentos}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-documentos/:id?" component={CadastroDocumentos}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-colaboradores" component={ConsultaColaboradores}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-colaboradores/:id?" component={CadastroColaboradores}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-naoconformidades/:id?" component={CadastroNaoConformidades} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-naoconformidades/:id?" component={ConsultaNaoConformidades} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-planosacao/:id?" component={CadastroPlanosAcao} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-planosacao/:id?" component={ConsultaPlanosAcao} />


            </Switch>
        </HashRouter>
    )
}

export default() => (
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />) }
        
    </AuthConsumer>
)