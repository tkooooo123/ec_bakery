import { useContext } from "react";
import { MessageContext } from "../store/messageStore";
import Swal from 'sweetalert2';


function Message() {
    const [message] = useContext(MessageContext);
console.log('message', message.type)
    if(message.icon) {
        Swal.fire({
            position: 'top',
            title: message.title,
            timer: 3000,
            icon: message.icon,
            text: message.text,
            showConfirmButton: false,
          });
    }
}

export default Message;