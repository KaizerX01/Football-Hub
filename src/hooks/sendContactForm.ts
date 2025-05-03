


interface ContactInfo{
    name:string,
    email:string,
    subject:string,
    message:string
}


export async function sendContactForm(formState :ContactInfo){
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    });

    return await response.json();
}


