package com.dw.ids.sonic.common.auth;

import com.dw.ids.sonic.common.model.ErrorResponse;
import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.PrintWriter;

@Slf4j
@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException {

        Gson gson = new Gson();
        PrintWriter writer = response.getWriter();
        ErrorResponse error = ErrorResponse.of(HttpStatus.FORBIDDEN.value(), accessDeniedException.getMessage());
        log.info("에러코드 : {}", accessDeniedException.hashCode());

        try {
            response.setStatus(HttpStatus.FORBIDDEN.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            writer.write(gson.toJson(error));
        }catch(NullPointerException e){
            log.error("응답 메시지 작성 에러", e);
        }finally{
            if(writer != null) {
                writer.flush();
                writer.close();
            }
        }
        response.getWriter().write(gson.toJson(error));
    }
}
