import React, { useState, useEffect } from 'react'
import withAuth from '../routes/withAuth'
import Layout from '../theme/Layout'
import LoadingModal from '../theme/LoadingModal'

function home() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }, [])

    return (
        <Layout page="home">
            homeasdasdsa
            asdasasd

            <LoadingModal open={loading} />
        </Layout>
    )
}

export default withAuth(home)