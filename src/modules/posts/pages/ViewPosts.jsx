import { useState, useEffect } from 'react';
import { Navbar } from '../../../common/Navbar';
import { useAuth } from '../../../contexts/AuthContext';
import { Search, FileText, ArrowLeft } from 'lucide-react';
import { LoadingScreen } from '../../../common/LoadingScreen';
import { Pagination } from '../../../common/Pagination';
import { PostCard } from '../components/PostCard';
import { usePostsHook } from '../hooks/usePostsHook';
import { Link } from 'react-router-dom';
import { router } from '../../../configs/router';

export const ViewPosts = () => {
    const { isAuth } = useAuth();
    const { loading, getAllPosts, posts, pagination } = usePostsHook();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const nextPage = () => { if (currentPage < pagination.totalPages) setCurrentPage(currentPage + 1); };
    const prevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1) };

    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => { getAllPosts(currentPage) }, [currentPage]);

    if(loading) return <LoadingScreen />;

    return (
        <div className="bg-white p-6 rounded-lg mx-auto">
            {isAuth ? (
                <Navbar />
            ) : (
                <div className="container mx-auto px-4 py-4 mb-4">
                    <div className="flex justify-between items-center">
                        <Link to={router.home} className="flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-200"
                        >
                            <ArrowLeft className="h-5 w-5 mr-1" />
                            <span>Volver</span>
                        </Link>
                        <div className="flex gap-3">
                            <Link to={router.Login} className="px-4 py-2 text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
                            >
                                Iniciar Sesión
                            </Link>
                            <Link to={router.register} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
                                Registrarse
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4 py-8">
                <div className="bg-gray-900 rounded-2xl shadow-2xl p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div className="flex items-center">
                            <FileText className="h-8 w-8 text-purple-400 mr-2" />
                            <h1 className="text-2xl font-bold text-white">
                                Mira todas las publicaciones
                            </h1>
                        </div>
                    </div>
                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar publicaciones..."
                            className="bg-gray-800 text-white w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
                                <PostCard key={post.post_ID} post={post} />
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-8 text-gray-400">
                                No se encontraron publicaciones
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Pagination 
                prevPage={prevPage} 
                nextPage={nextPage}
                currentPage={currentPage}
                totalPages={pagination.totalPages}
            />
        </div>
    );
};