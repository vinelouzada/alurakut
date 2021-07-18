import dato, { SiteClient } from 'datocms-client';

export default async function recebeDepoimento(request, response){
    
    if (request.method === "POST") {
        const TOKEN = "70c34c92b18a3e63ed4b0720f474bc";
        const client = new SiteClient(TOKEN);

        const criarDepoimento = await client.items.create({
            itemType: "976158",
            ...request.body,
        })
        console.log(criarDepoimento);
        response.json({
            dados: "Algum",
            criarDepoimento: criarDepoimento
        })
        return;        
    }
    response.status(404).json({
        message: "Ainda não temos nada no GET, mas no POST tem!"
    })
}
