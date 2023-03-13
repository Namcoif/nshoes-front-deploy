import { useEffect, useState } from "react"

const WithLoading = (WrappedComponent) => {
    const WithLoadingComponent = (props) => {
        const [isLoading, setIsLoading] = useState(false);

        useEffect(() => {
            setIsLoading(props.loading)
        }, [])
        return (
            <div>

            </div>
        )
    }
}