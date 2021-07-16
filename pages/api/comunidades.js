import dato, { SiteClient } from 'datocms-client';

export default async function recebedorDeRequest(request, response){

    if (request.method === "POST") {
        const TOKEN = "70c34c92b18a3e63ed4b0720f474bc";
        const client = new SiteClient(TOKEN)

        const registroCriado = await client.items.create({
            itemType: "971596",
            ...request.body,
            // title: "Comunidade de Teste",
            // imageUrl: "https://alurakut.vercel.app/capa-comunidade-01.jpg",
            // creatorSlug: "vinelouzada"
        })

        
        console.log(registroCriado);
        response.json({
            dados: "Algum",
            registroCriado: registroCriado
        })
        return;
    }

    response.status(404).json({
        message: "Ainda não temos nada no GET, mas no POST tem!"
    })
    
    
}