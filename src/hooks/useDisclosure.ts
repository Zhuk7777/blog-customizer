import { useState, useEffect } from 'react';

interface IDisclosureOptions {
	onOpen?: () => void;
	onClose?: () => void;
}

export const useDisclosure = (
	initialState = false,
	{ onOpen, onClose }: IDisclosureOptions = {}
) => {
	const [isOpen, setIsOpen] = useState(initialState);

	useEffect(() => {
		setIsOpen(initialState);
	}, [initialState]);

	const open = () => {
		if (onOpen) onOpen();
		setIsOpen(true);
	};

	const close = () => {
		if (onClose) onClose();
		setIsOpen(false);
	};

	const toggle = () => {
		isOpen ? close() : open();
	};

	return { isOpen, toggle, open, close };
};
