import { SearchBar } from "../../Components"
import {PlaceList} from "../../Components"
import './index.css'

export default function ListPage() {
  return (
    <div className="list-page" >

      <SearchBar />
      <div className="list-container">
      <PlaceList />
      </div>
    </div>
  )
}
