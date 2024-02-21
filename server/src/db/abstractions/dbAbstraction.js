import _forEach from "lodash/forEach.js";

export const dbAbstraction = (Model) => {
  const count = async () => await Model.countDocuments();

  //Faster than count
  const estimateCount = async () => await Model.estimatedDocumentCount();

  const insert = async ({ ...info }) => Model.create({ ...info });

  const insertMany = async (arr) => await Model.insertMany(arr);

  const updateOne = async (_filter, info) => {
    return await Model.findOneAndUpdate(_filter, info, {
      new: true,
    }).exec();
  };

  const updateMany = async (_filter, info) => {
    return await Model.updateMany(_filter, info, { new: true }).exec();
  };

  const remove = async (id) => {
    const result = await Model.deleteOne({ id }).exec();

    return {
      found: result.n,

      deleted: result.deletedCount,
    };
  };

  const removeAll = async () => {
    const result = await Model.deleteMany({}).exec();

    return {
      found: result.n,

      deleted: result.deletedCount,
    };
  };

  const find = async (_filter, _options = {}) => {
    const { populate, sort } = _options;

    const query = Model.find(_filter);

    if (sort) query.sort(sort);

    if (populate) _forEach(populate || [], (p) => query.populate(p));

    return await query.exec();
  };

  const findOne = async (_filter, _options = {}) => {
    const { populate, sort } = _options;

    const query = Model.findOne(_filter);

    if (sort) query.sort(sort);

    _forEach(populate || [], (p) => query.populate(p));

    return await query.exec();
  };

  const findOneAndUpdate = async (_filter, _update) => {
    return await Model.findOneAndUpdate(_filter, _update, { new: true }).exec();
  };

  const findOneAndRemove = async (_filter, _options = {}) =>
    await Model.findOneAndDelete(_filter);

  const findById = async (id, _options = {}) => {
    const { populate } = _options;

    const query = Model.findById(id);

    if (populate) _forEach(populate || [], (p) => query.populate(p));

    return await query.exec();
  };

  const findByIdAndUpdate = async (id, update, _options = {}) => {
    const query = Model.findByIdAndUpdate(id, update, { new: true });

    return await query.exec();
  };

  const findByIdAndRemove = async (id) => {
    return await Model.findByIdAndDelete(id).exec();
  };

  return Object.freeze({
    count,
    estimateCount,
    insert,
    insertMany,
    updateOne,
    updateMany,
    remove,
    removeAll,
    find,
    findOne,
    findOneAndUpdate,
    findOneAndRemove,
    findById,
    findByIdAndUpdate,
    findByIdAndRemove,
  });
};
