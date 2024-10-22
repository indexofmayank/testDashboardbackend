const Seo = require('../models/seoModal');
const catchAsyncErrors = require('../middlewares/CatchAsyncError');
const { default: mongoose } = require('mongoose');


exports.createSeo = async (req, res) => {
    console.log(req.body);
    try {
        const newSeo = await Seo.create(req.body);
        if(!newSeo) {
            return res.status(400).json({
                success: false,
                message: 'Not able to save seo'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'created successfully',
            data: newSeo
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

exports.getAllSeo = catchAsyncErrors(async (req, res, next) => {
    try {
        const SeoList = await Seo.aggregate([
            {
                $project: {
                    select_page: {$ifNull: ["$select_page", "N/a"]},
                    meta_title: {$ifNull: ["$meta_title", "N/a"]},
                    meta_description: {$ifNull: ["$meta_description", "N/a"]},
                    meta_keywords: {$ifNull: ["$meta_keywords", "N/a"]}
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            data: SeoList,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

exports.getSeoByPage = async (req, res) => {
    try {
       const {page} = req.query;
       const matchCondition = page ? {"select_page" : {$regex: page, $options: "i"}} : {}
        const seoData = await Seo.aggregate([
            {
                $match: matchCondition
            },
            {
                $project: {
                    select_page: {$ifNull: ["$select_page", "N/a"]},
                    meta_title: {$ifNull: ["$meta_title", "N/a"]},
                    meta_description: {$ifNull: ["$meta_description", "N/a"]},
                    meta_keywords: {$ifNull: ["$meta_keywords", "N/a"]}
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            message: 'it is working bro',
            data: seoData[0]
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}