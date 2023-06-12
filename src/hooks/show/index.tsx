import {useState} from "react"
function useShow(){
const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

return { handleClose, handleShow, show }

}
export default useShow