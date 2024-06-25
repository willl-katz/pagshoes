"use server"
import axios from "axios";
import {v4 as uuid} from "uuid";

// Definição da data de expiração do checkout em sua criação
const dataAtual = new Date(); // Obter a data e hora atual
dataAtual.setMinutes(dataAtual.getMinutes() + 30); // Adicionar 30 minutos
const dataFormatada = dataAtual.toISOString(); // Formatar a data no formato ISO

export async function createCheckout({id, price, title}:{id:number,price:number,title:string}) {
    try {
        // Config do checkout do pagseguro
        const idRadom = uuid()
        const options = {
            method: 'POST',
            url: 'https://sandbox.api.pagseguro.com/checkouts',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TOKEN_PAGSEGURO}`,
                'Content-type': 'application/json'
            },
            data: {
                customer_modifiable: true,
                items: [
                {
                    reference_id: id,
                    name: `Tênis Esportivo - ${title}`,
                    quantity: 1,
                    unit_amount: price,
                    image_url: "https://m.media-amazon.com/images/I/416oAQ6gQNL._AC_SY300_.jpg",
                    description: 'Tênis esportivo do caralho'
                }
                ],
                reference_id: idRadom,
                redirect_url: 'https://pagseguro.uol.com.br'
            }
        };

        // Chamada na pagseguro para a criação do checkout
        const link = await axios.request(options)
        .then(function (response) {
            const link = response.data.links[1].href
            return link
        })
        .catch(function (error) {
            throw error;
        });
        console.log(link);
        return link;
    } catch (err) {
        console.error(err);
        return undefined; // Para não retorna void
    }
}