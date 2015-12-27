package com.lijun.excel;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

/**
 * @author LiJun
 * @created 2015-4-12
 */
public class DoParse extends HttpServlet {

    /**
	 * 
	 */
	private static final long serialVersionUID = -3266132568733534663L;

	public JSONArray parseExcel(String filePath) throws IOException {
        String excel2003_2007 = "D:\\test/uploads/"+filePath;
        String excel2010 = "D:\\test/uploads/"+filePath;
        
        File dir = new File(excel2003_2007);
        if (dir.isDirectory()) {
        	File[] dirFile = dir.listFiles();
            for (File f : dirFile) {
                if (f.getName().endsWith(".xls")){
                	excel2003_2007 = f.getAbsolutePath();
                }else if (f.getName().endsWith(".xlsx")){
                	excel2010 = f.getAbsolutePath();
				}
            }  
		}
        
        // read the 2003-2007 excel
        List<Object> list07 = new ReadExcel().readExcel(excel2003_2007);
        List<Object> rtJson07 = new ArrayList();
        JSONArray jsonObj = JSONArray.fromObject(rtJson07);
        if (list07 != null) {
            for (Object column: list07) {
            	JSONArray jsonArray = JSONArray.fromObject(column);
            	rtJson07.add(jsonArray);
            }
            jsonObj = JSONArray.fromObject(rtJson07);
        }
        
        // read the 2010 excel
        List<Object> rtJson10 = new ArrayList();
        List<Object> list10 = new ReadExcel().readExcel(excel2010);
        if (list10 != null) {
        	for (Object column: list10) {
            	JSONArray jsonArray = JSONArray.fromObject(column);
                rtJson10.add(jsonArray);
            }
        	jsonObj = JSONArray.fromObject(rtJson10);
        }
        return jsonObj;
    }
	
	@Override
    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException
    {
		String filePath = req.getParameter("filePath");
		resp.setHeader("Content-type", "text/html;charset=UTF-8"); 
		resp.getWriter().print(parseExcel(filePath));
    }
	
	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException
	{
		String filePath = req.getParameter("filePath");
		resp.setHeader("Content-type", "text/html;charset=UTF-8"); 
		resp.getWriter().print(parseExcel(filePath));
	}
}
