import React from 'react'
import { useEffect, useState } from 'react';
import LoadingModal from '../../theme/LoadingModal'
import axios from 'axios';
import hostname from '../../utils/hostname';
import { useRouter } from 'next/router'


function Callback() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { code, state } = router.query

    // console.log('code', code)

    // if (code) {
    //     console.log('if')

    //     setLoading(false)
    //     runApp()
    // }

    const runApp = async () => {
        console.log('code', code)
        // if (!code) {
        //     console.log('if')
        //     setLoading(false)
        // } else {
        try {
            console.log('code else', code)

            let res = await axios({
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
                method: "post",
                url: `${hostname}/auth/login_line`,
                data: {
                    code: code
                }
            });

            let resData = res.data

            console.log('resData', resData)

        } catch (error) {
            console.log(error);
        }
        // }


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