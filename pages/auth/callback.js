import React from 'react'
import { useEffect, useState } from 'react';
import LoadingModal from '../../theme/LoadingModal'
import axios from 'axios';
import hostname from '../../utils/hostname';
import { useRouter } from 'next/router'


function Callback() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    let code;
    let state;
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
        code = new URLSearchParams(window.location.search).get("code");
        state = new URLSearchParams(window.location.search).get("state");

    }


    const runApp = async () => {
        try {
            console.log('code', code)
            console.log('state', state)


            let res = await axios({
                method: "post",
                url: `${hostname}/auth/login_line`,
                data: {
                    code: code,
                    state: state
                }
            });

            let resData = res.data

            console.log('resData', resData)

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        runApp()
    }, [])


    return (
        <>
            callback
            <LoadingModal open={loading} />
        </>
    )
}

export default Callback