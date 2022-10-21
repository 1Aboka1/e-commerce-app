import {RootState} from "../../store"
import { useSelector } from "react-redux"

export const Favorites = () => {
    const shopping_session = useSelector((state: RootState) => state.shopping_session)

    return (
	<div>
	    favorites
	</div>
    )
}
