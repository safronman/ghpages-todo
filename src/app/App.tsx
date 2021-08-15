import React, {useEffect} from 'react'
import classes from './App.module.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TodolistList} from "../features/TodolistList/TodolistList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from "../Login/Login";
import {CircularProgress} from '@material-ui/core';
import {logoutTC} from "../Login/auth-reducer";

function App() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div>
            <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}><h1 style={{color: "blue"}}>ToDo</h1></div>
            <div style={{position: 'fixed', top: '40%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        </div>
    }
    const handlerLogout = () => {
        dispatch(logoutTC())
    }

    return (
        <div className={classes.app}>
            <AppBar color={"secondary"} position={"static"}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge={"start"} color={"inherit"} aria-label={"Menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    {isLoggedIn && <Button variant={"contained"} color={"primary"} onClick={handlerLogout}>Log Out</Button>}
                </Toolbar>
            </AppBar>
            {status === "loading" && <LinearProgress color={"primary"}/>}
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistList/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                  {/*  <Route path={'/404'}
                           render={() => <h1 style={{textAlign: 'center', fontSize: '50px'}}>404: PAGE NOT
                               FOUND</h1>}/>*/}
                    <Redirect from={'*'} to={'/login'}/>
                </Switch>
            </Container>
            <ErrorSnackbar/>
        </div>
    )
}

export default App;
