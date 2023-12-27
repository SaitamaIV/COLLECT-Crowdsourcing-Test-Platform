package com.controller;

import com.service.AlgorithmService;
import com.utils.Response;
import com.vo.AlgorithmFormVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;

@RestController
@RequestMapping("/algorithm")
public class AlgorithmController {

    @Autowired
    AlgorithmService algorithmService;

    @PostMapping("/changestrategy")
    public Response changeStrategy(@RequestBody AlgorithmFormVO algorithmFormVO){
        Response response;
        try{
            response = algorithmService.changeStrategy(algorithmFormVO);
        }catch (URISyntaxException e){
            e.printStackTrace();
            return Response.error();
        }
        return response;
    }

    @GetMapping("/getstrategy")
    public Response getStrategy(){
        return algorithmService.getStrategy();
    }

    @PostMapping("/matching")
    public Response calMatching(){
        return Response.ok().put("matching", algorithmService.calMatching(2L));
    }

}
