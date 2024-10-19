import { CSSProperties, useCallback, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';
import clsx from 'clsx';
import styles from './styles/app.module.scss';
import { ArticleParamsForm } from './components/article-params-form';
import { Article } from './components/article';

export const App = () => {
	const [articleStyles, setArticleStyles] = useState<CSSProperties>({
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	} as CSSProperties);

	const updateArticleSettings = useCallback((settings: ArticleStateType) => {
		setArticleStyles({
			'--font-family': settings.fontFamilyOption.value,
			'--font-size': settings.fontSizeOption.value,
			'--font-color': settings.fontColor.value,
			'--container-width': settings.contentWidth.value,
			'--bg-color': settings.backgroundColor.value,
		} as CSSProperties);
	}, []);

	return (
		<div className={clsx(styles.main)} style={articleStyles}>
			<ArticleParamsForm updateArticleSettings={updateArticleSettings} />
			<Article />
		</div>
	);
};
