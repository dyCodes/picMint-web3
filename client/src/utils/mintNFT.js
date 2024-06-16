import { ethers } from 'ethers';
import PicNftMinter from '../PicNftMinter.json';
import { contractAddress } from '../../config/contract';

export const mintNFT = async (metadataURI) => {
	if (!window.ethereum) return;

	try {
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();
		const contract = new ethers.Contract(contractAddress, PicNftMinter, signer);
		const recipient = signer.address;

		const transaction = await contract.mintNFT(recipient, metadataURI);
		await transaction.wait();
		return transaction;
	} catch (error) {
		console.log(error);
	}
};
