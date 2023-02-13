// import logo from './logo.svg';
// import liff from '@line/liff';
import { useEffect, useState } from 'react';
import LoadingModal from '../../theme/LoadingModal'
import axios from 'axios';
import hostname from '../../utils/hostname';
import { useRouter } from 'next/router'

function Line() {
    const [pictureUrl, setPictureUrl] = useState('');
    const [idToken, setIdToken] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [code, setCode] = useState('')


    // const test = new URLSearchParams(document.location.search).get("code");
    // console.log('test', test)
    const queryParams = new URLSearchParams(window.location.search);
    const code1 = queryParams.get('code');
    console.log('code1', code1)

    const logout = () => {
        liff.logout();
        window.location.reload();
    }

    const initLine = async () => {
        setLoading(true)
        const liff = await import('@line/liff')
        liff.init({ liffId: '1657892994-04KMLPvK' }, () => {
            if (liff.isLoggedIn()) {
                runApp();
                setLoading(false)

            } else {
                liff.login();
                setLoading(false)

            }
        }, err => console.error(err));
    }

    const runApp = async () => {
        const idToken = liff.getIDToken();
        setIdToken(idToken);

        const { code, state } = router.query


        // try {
        //     let res = await axios({
        //         headers: {
        //             Authorization: "Bearer " + localStorage.getItem("access_token"),
        //         },
        //         method: "post",
        //         url: `${hostname}/auth/login_line`,
        //         data: {
        //             code: code
        //         }
        //     });

        //     let resData = res.data

        //     console.log('resData', resData)

        // } catch (error) {
        //     console.log(error);
        // }
        await localStorage.setItem("code", code)

        localStorage.setItem("access_token", idToken)
        liff.getProfile().then(profile => {
            console.log(profile);
            setDisplayName(profile.displayName);
            setPictureUrl(profile.pictureUrl);
            setStatusMessage(profile.statusMessage);
            setUserId(profile.code);
        }).catch(err => console.error(err));

        await setCode(code)
        await console.log('code', code)
        await console.log('state', state)


    }

    useEffect(() => {
        initLine();
    }, []);

    return (
        <div >
            <header >
                <div style={{ textAlign: "center" }}>
                    <h1>React with LINE Login test bot1</h1>
                    <hr />
                    <img src={pictureUrl} width="300px" height="300px" />
                    <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>id token: </b> {idToken}</p>
                    <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>display name: </b> {displayName}</p>
                    <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>status message: </b> {statusMessage}</p>
                    <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>user id: </b> {code}</p>

                    <button onClick={() => logout()} style={{ width: "100%", height: 30 }}>Logout</button>
                </div>
            </header>
            <LoadingModal open={loading} />

        </div>
    );
}

export default Line;