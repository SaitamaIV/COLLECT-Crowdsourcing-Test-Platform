package com.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.po.Report;
import com.utils.Response;
import com.vo.MyPage;
import com.vo.ReportVO;

public interface ReportService extends IService<Report> {
    Response submitReport(ReportVO reportVO);

    Response getReportList(Long fid);

    Response getReport(Long rid);
}
