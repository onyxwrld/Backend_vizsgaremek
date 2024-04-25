import { ApiProperty } from "@nestjs/swagger";
export class CreateOpeningDto {
    @ApiProperty({ description: 'Nyitvatartás hétfőn', example: '08:00 - 18:00' })
    Monday: string;

    @ApiProperty({ description: 'Nyitvatartás keddén', example: '08:00 - 18:00' })
    Tuesday: string;

    @ApiProperty({ description: 'Nyitvatartás szerdán', example: '08:00 - 18:00' })
    Wednesday: string;

    @ApiProperty({ description: 'Nyitvatartás csütörtökön', example: '08:00 - 18:00' })
    Thursday: string;

    @ApiProperty({ description: 'Nyitvatartás pénteken', example: '08:00 - 18:00' })
    Friday: string;

    @ApiProperty({ description: 'Nyitvatartás szombaton', example: '10:00 - 14:00' })
    Saturday: string;

    @ApiProperty({ description: 'Nyitvatartás vasárnap', example: 'Closed' })
    Sunday: string;
}
