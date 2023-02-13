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

    console.log('code', code)



    // const runApp = async () => {
    //     try {
    //         let res = await axios({
    //             headers: {
    //                 Authorization: "Bearer " + localStorage.getItem("access_token"),
    //             },
    //             method: "post",
    //             url: `${hostname}/auth/login_line`,
    //             data: {
    //                 code: code
    //             }
    //         });

    //         let resData = res.data

    //         console.log('resData', resData)

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return (
        <>
            <LoadingModal open={loading} />
        </>
    )
}

export default Callback