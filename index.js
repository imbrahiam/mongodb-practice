require('dotenv').config();
const { MongoClient } = require('mongodb');

async function main() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, { tlsAllowInvalidCertificates: true });

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const database = client.db('provinciasRD');
        const collection = database.collection('provincias');

        const provincias = [
            { nombre: "Azua", region: "Sur" },
            { nombre: "Baoruco", region: "Sur" },
            { nombre: "Barahona", region: "Sur" },
            { nombre: "Dajabón", region: "Noroeste" },
            { nombre: "Distrito Nacional", region: "Ozama" },
            { nombre: "Duarte", region: "Nordeste" },
            { nombre: "Elías Piña", region: "Sur" },
            { nombre: "El Seibo", region: "Este" },
            { nombre: "Espaillat", region: "Norte" },
            { nombre: "Hato Mayor", region: "Este" },
            { nombre: "Hermanas Mirabal", region: "Nordeste" },
            { nombre: "Independencia", region: "Sur" },
            { nombre: "La Altagracia", region: "Este" },
            { nombre: "La Romana", region: "Este" },
            { nombre: "La Vega", region: "Norte" },
            { nombre: "María Trinidad Sánchez", region: "Nordeste" },
            { nombre: "Monseñor Nouel", region: "Norte" },
            { nombre: "Monte Cristi", region: "Noroeste" },
            { nombre: "Monte Plata", region: "Ozama" },
            { nombre: "Pedernales", region: "Sur" },
            { nombre: "Peravia", region: "Sur" },
            { nombre: "Puerto Plata", region: "Norte" },
            { nombre: "Samaná", region: "Nordeste" },
            { nombre: "San Cristóbal", region: "Ozama" },
            { nombre: "San José de Ocoa", region: "Sur" },
            { nombre: "San Juan", region: "Sur" },
            { nombre: "San Pedro de Macorís", region: "Este" },
            { nombre: "Sánchez Ramírez", region: "Norte" },
            { nombre: "Santiago", region: "Norte" },
            { nombre: "Santiago Rodríguez", region: "Noroeste" },
            { nombre: "Santo Domingo", region: "Ozama" },
            { nombre: "Valverde", region: "Noroeste" },
          ];

        const result = await collection.insertMany(provincias);
        console.log(`${result.insertedCount} provincias fueron insertadas`);

        const query = {};
        const options = {
            projection: { _id: 0, nombre: 1 },
        };
        const cursor = collection.find(query, options);

        console.log("Provincias de la República Dominicana:");
        await cursor.forEach(provincia => console.log(provincia.nombre));

    } finally {
        await client.close();
    }
}

main().catch(console.error);



