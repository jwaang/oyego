class Review {
  constructor(model) {
    this.Model = model;
  }

  create(data) {
    return this.Model.create(data);
  }

  findAndUpdate(id, data) {
    return this.Model.findOneAndUpdate({ _id: id }, data, { new: true, runValidators: true });
  }

  findAndDelete(id) {
    return this.Model.findOneAndRemove({ _id: id });
  }

  getAll() {
    return this.Model.find({}).sort({ lastUpdated: "desc" });
  }

  getAllByEmail(email) {
    return this.Model.find({ email }).sort({ lastUpdated: "desc" });
  }

  getAllBySub(sub) {
    return this.Model.find({ sub }).sort({ lastUpdated: "desc" });
  }
}

module.exports = Review;
