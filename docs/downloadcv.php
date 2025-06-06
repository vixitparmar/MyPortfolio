<?php
if(isset($_GET['file']) && !empty($_GET['file'])) {
    $file = $_GET['file'];

    if(file_exists($file)) {
        header('Content-Description: File Transfer');
        header('Content-Type: application/pdf');
        header('Content-Disposition: attachment; filename='.basename($file));
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file));
        readfile($file);
        exit;
    } else {
        die('File not found.');
    }
}
?>
