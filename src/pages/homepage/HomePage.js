import React, { useEffect } from 'react';
import Header from './header/Header';
import { Outlet } from 'react-router-dom';
import { useSelector, connect, useDispatch } from 'react-redux';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import SignIn from './../signin/SignIn';
import userActions from '../../redux/actions/userActions';
import pageActions from '../../redux/actions/pageActions';
import HeaderAnonymous from './header/HeaderAnonymous';
import SignUp from './../signup/SignUp';
import Footer from './footer/Footer';
function HomePage(props) {

    const { istoggleSignIn, _toggleSignIn, istoggleSignUp, _toggleSignUp } = props

    const path = window.location.pathname;

    // const selector = useSelector((state) => state);

    const dispatch = useDispatch();

    const selector = useSelector(state => state);

    const toggleFormSignIn = () => {
        _toggleSignIn()
    }

    const toggleFormSignUp = () => {
        _toggleSignUp()
    }

    useEffect(() => {
        dispatch(pageActions.changeTitle("NShoes"))
        console.log(path);


    }, [])

    return (
        <div id='homepage-container'
            class="
                    flex flex-col
                    ">

            <header id='homepage-header'
                class='
                        z-10'>
                {
                    // selector.page.isLoggin
                    localStorage.isLogged
                        ?
                        <Header />
                        :
                        <HeaderAnonymous />
                }
            </header>
            <Dialog
                open={istoggleSignIn}
                onClose={toggleFormSignIn}
            >
                <DialogContent>
                    <SignIn />

                </DialogContent>

            </Dialog>

            <Dialog
                open={istoggleSignUp}
                onClose={toggleFormSignUp}
            >
                <DialogContent>
                    <SignUp />

                </DialogContent>

            </Dialog>


            <div id='homepage-body'
                class="">
                <Outlet />
            </div>
            <footer
                class='
                        bg-white'>
                <Footer />

            </footer>
        </div >
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        _toggleSignIn: () => {
            dispatch(userActions.toggleSignIn())
        },
        _toggleSignUp: () => {
            dispatch(userActions.toggleSignUp())
        }

    }
}

const mapStateToProps = (state) => {
    return {
        istoggleSignIn: state.user.toggleSignIn,
        istoggleSignUp: state.user.toggleSignUp
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
// export default HomePage;