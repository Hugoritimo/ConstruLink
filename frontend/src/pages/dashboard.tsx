import { motion } from "framer-motion";

const Dashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8"
    >
      <motion.h1
        variants={itemVariants}
        className="text-4xl font-bold mb-8 text-brand-dark dark:text-brand-white"
      >
        Dashboard
      </motion.h1>
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div
          variants={itemVariants}
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold">Relatório 1</h2>
          <p className="mt-4 text-brand-gray dark:text-brand-white">
            Detalhes do relatório...
          </p>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold">Relatório 2</h2>
          <p className="mt-4 text-brand-gray dark:text-brand-white">
            Detalhes do relatório...
          </p>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold">Relatório 3</h2>
          <p className="mt-4 text-brand-gray dark:text-brand-white">
            Detalhes do relatório...
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
