import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase.config'

const useAuth = () => {
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        // Écouter les changements d'état d'authentification


        // Vérifier le localStorage au montage
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser)

                console.log('Utilisateur récupéré du localStorage:', parsedUser)
                setCurrentUser(parsedUser)
            } catch (error) {
                console.error('Erreur parsing user:', error)
                localStorage.removeItem('user')
            }
        }

     
    }, [])

    return {
        currentUser,
    }
}

export default useAuth