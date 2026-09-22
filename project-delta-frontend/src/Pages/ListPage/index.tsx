import { SearchBar } from "../../Components"
import {PlaceList} from "../../Components"

export default function ListPage() {
  return (
    <div className="list-page" >
      <SearchBar />
      <PlaceList />
    </div>
  )
}
