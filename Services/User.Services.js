import { User } from "../models/UserModel.js";

export const UserServices = {
  getUserData: async (userId, searchQuery, page, ITEMS_PER_PAGE) => {
    try {
      let allUsers = await User.find({ userId }).exec();
      let filteredUsers = allUsers.filter((user) => {
        return user.user.toLowerCase().includes(searchQuery.toLowerCase());
      });

      filteredUsers = filteredUsers.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateB - dateA;
      });

      const totalCount = filteredUsers.length;
      const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

      const paginatedData = filteredUsers.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
      );

      return {
        data: paginatedData,
        currentPage: page,
        totalPages: totalPages,
        totalCount: totalCount,
      };
    } catch (error) {
      throw error;
    }
  },
};
