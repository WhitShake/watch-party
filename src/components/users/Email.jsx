import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export const Email = (props) => {
    const form = useRef();
    const serviceId = process.env.REACT_APP_emailJS_serviceId;
    const templateId = process.env.REACT_APP_emailJS_templateId;
    const publicKey = process.env.REACT_APP_emailJS_publicKey
    const [isCooldownActive, setIsCooldownActive] = useState(false);


    // const sendEmail = (e) => {
    //     e.preventDefault();

    //     if (isCooldownActive) {
    //         alert("Please wait before sending another email invitation")
    //         return;
    //     }

    //     emailjs.sendForm('service_ocm4k1a', 'template_gdhcj6m', form.current, 'X4vniASpzu_w1dEDH')
    //     .then((result) => {
    //         console.log(result.text);
    //         setIsCooldownActive(true);
    //         setTimeout(() => {
    //             setIsCooldownActive(false)
    //         }, 300000)
    //     }, (error) => {
    //         console.log(error.text);
    //     });
    // };

    const sendEmail = (e) => {
        e.preventDefault();

        if (props.userData === null) {
            alert("You must be logged in to use this feature")
        }
    
        if (isCooldownActive) {
            alert("Please wait before sending another email invitation");
            return; 
        }
    
        emailjs.sendForm(serviceId, templateId, form.current, publicKey)
        .then((result) => {
            console.log(result.text);
            setIsCooldownActive(true);
            alert("Email invitation sent!")
    

            setTimeout(() => {
                setIsCooldownActive(false);
            }, 300000); 
        })
        .catch((error) => {
            console.log(publicKey, templateId, serviceId)
            console.log(error.text);
        });
    };


    return (
        <form ref={form} onSubmit={sendEmail}>
            <input type="hidden" name="from_name" value={props.userData.firstName + " " + props.userData.lastName} />
            <input type="hidden" name="to_email" value={props.friendEmail} />
            <input type="hidden" name="reply_to" value={props.userEmail} />
            <input type="hidden" name="to_name"value={props.friendFirstName + " " + props.friendLastName}/>
            <input type="hidden" name="message" value="Watch a movie with me!" />
            <input type="submit" value="Send a watch invite" />
        </form>
);
};

