import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useDisclosure } from 'src/hooks/useDisclosure';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

export const ArticleParamsForm = ({
	updateArticleSettings,
}: {
	updateArticleSettings: (settings: ArticleStateType) => void;
}) => {
	const { isOpen, toggle, close } = useDisclosure();
	const sideBarRef = useRef<HTMLDivElement | null>(null);

	const [settings, setSettings] =
		useState<ArticleStateType>(defaultArticleState);

	useEffect(() => {
		const handleClickOutside = (evt: MouseEvent) => {
			if (
				sideBarRef.current &&
				!sideBarRef.current.contains(evt.target as Node)
			) {
				close();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [close, sideBarRef]);

	const handleChange = useCallback(
		(field: keyof ArticleStateType, value: OptionType) => {
			setSettings((prevSettings) => ({
				...prevSettings,
				[field]: value,
			}));
		},
		[]
	);

	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		updateArticleSettings(settings);
	};

	const handleReset = () => {
		setSettings(defaultArticleState);
		updateArticleSettings(defaultArticleState);
	};

	return (
		<>
			<ArrowButton onClick={toggle} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={sideBarRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} uppercase weight={800}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={settings.fontFamilyOption}
						onChange={(selectedFontFamily) =>
							handleChange('fontFamilyOption', selectedFontFamily)
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={settings.fontSizeOption}
						onChange={(selectedFontSize) =>
							handleChange('fontSizeOption', selectedFontSize)
						}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={settings.fontColor}
						onChange={(selectedFontColor) =>
							handleChange('fontColor', selectedFontColor)
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={settings.backgroundColor}
						onChange={(selectedBgColor) =>
							handleChange('backgroundColor', selectedBgColor)
						}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={settings.contentWidth}
						onChange={(selectedContentWidth) =>
							handleChange('contentWidth', selectedContentWidth)
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
