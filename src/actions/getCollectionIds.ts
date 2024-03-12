"use server";

import dotenv from "dotenv";
dotenv.config();


async function getCollectionIds(wallets: string | null) {
  let collectionIds: string[] = [];

  let apikey: string = process.env.SIMPLE_HASH ?? "";
 
  const fetchData = async (url: string) => {
    const headers = new Headers();
    headers.append("x-api-key", apikey);

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    const jsonData = await response.json();

    const filteredTransfers = jsonData.transfers.filter(
      (transfer: any) => transfer.chain === "bitcoin" && transfer.collection_id !== null
    );

    const ids = filteredTransfers.map((transfer: any) => transfer.collection_id);
    collectionIds = collectionIds.concat(ids);

    if (jsonData.next) {
      await fetchData(jsonData.next);
    }
  };

  await fetchData(`https://api.simplehash.com/api/v0/nfts/transfers/wallets?chains=bitcoin&wallet_addresses=${wallets}`);

  return collectionIds;
}

export default getCollectionIds;