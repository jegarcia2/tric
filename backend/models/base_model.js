const { Model } = require('sequelize');

class BaseModel extends Model {
  // Shared soft delete
  async softDelete() {
    this.deletedAt = new Date();
    await this.save();
  }

  // Shared check
  isDeleted() {
    return !!this.deletedAt;
  }

  // Example shared utility
  toDTO() {
    const { id, createdAt, updatedAt } = this;
    return { id, createdAt, updatedAt };
  }
}

module.exports = BaseModel;