import { Navigate, useSearchParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import PageLoadingSpiner from '../../components/Loading/pageLoadingSpiner'
import { verifyUserAPI } from '../../apis'
function AccountVerification() {
    // lay gia tri tu url
    let [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const email = searchParams.get('email')
    const [verified, setVerified] = useState(null)

    useEffect(() => {
        if (token && email) {
            verifyUserAPI({ token, email })
            .then(()=> {
                setVerified(true)
            })
        }
    },[token, email])

    if (!token && !email) {
        return <Navigate to="/404" />
    }
    if (!verified) {
        return <PageLoadingSpiner text="verifying your account..."/>
    }
  return <Navigate to={`/login?verifiedEmail=${email}`}/>;
}

export default AccountVerification