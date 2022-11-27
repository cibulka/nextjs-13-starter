import { getPostPage } from 'src/server/posts/components';
import { generateStaticParamsForArticles } from 'src/server/posts/params';

const LOCALE = 'cs';

export const generateStaticParams = async () => generateStaticParamsForArticles(LOCALE);

const PostPage = getPostPage(LOCALE);
export default PostPage;