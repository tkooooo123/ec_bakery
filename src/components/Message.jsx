import { useContext } from "react";
import { MessageContext } from "../store/messageStore";
import Swal from 'sweetalert2';


function Message() {
    const [message] = useContext(MessageContext);
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500
      })

    if(message.type === 'small') {
        Toast.fire({
            title: message.title,
            icon: message.icon,
            text: message.text,  
          });

    } else if(message.icon) {
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