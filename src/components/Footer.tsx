import { INFO } from '@/data';

export const Footer = () => {
    return (
        <footer className="flex items-center justify-center py-8">
            <p className="text-white">
                &copy; 2022 - Present, {INFO.name.first} {INFO.name.last}.
            </p>
        </footer>
    );
};
