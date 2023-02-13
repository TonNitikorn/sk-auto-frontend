// import logo from './logo.svg';
// import liff from '@line/liff';
import { useEffect, useState } from 'react';
import LoadingModal from '../../theme/LoadingModal'
import axios from 'axios';
import hostname from '../../utils/hostname';

function Line() {
    const [pictureUrl, setPictureUrl] = useState('');
    const [idToken, setIdToken] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(false)

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

        try {
            let res = await axios({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
                method: "post",
                url: `${hostname}/auth/line_id`,
                data: {
                    token: idToken
                }
            });

            let resData = res.data

            console.log('resData', resData)

        } catch (error) {
            console.log(error);
        }

        // localStorage.setItem("access_token", idToken)
        // liff.getProfile().then(profile => {
        //     console.log(profile);
        //     setDisplayName(profile.displayName);
        //     setPictureUrl(profile.pictureUrl);
        //     setStatusMessage(profile.statusMessage);
        //     setUserId(profile.userId);
        // }).catch(err => console.error(err));
    }

    useEffect(() => {
        initLine();
    }, []);

    return (
        <div >
            {/* <header >
                <div style={{ textAlign: "center" }}>
                    <h1>React with LINE Login test bot1</h1>
                    <hr />
                    <img src={pictureUrl} width="300px" height="300px" />
                    <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>id token: </b> {idToken}</p>
                    <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>display name: </b> {displayName}</p>
                    <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>status message: </b> {statusMessage}</p>
                    <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>user id: </b> {userId}</p>

                    <button onClick={() => logout()} style={{ width: "100%", height: 30 }}>Logout</button>
                </div>
            </header> */}
            <LoadingModal open={loading} />

        </div>
    );
}

export default Line;